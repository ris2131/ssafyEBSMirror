package com.ssafyebs.businessbe.domain.business.service;

import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessCreationRequestDto;
import com.ssafyebs.businessbe.domain.business.dto.requestdto.BusinessEmailRequestDto;
import com.ssafyebs.businessbe.domain.business.entity.Business;
import com.ssafyebs.businessbe.domain.business.repository.BusinessRepository;
import com.ssafyebs.businessbe.global.exception.MailSendException;
import com.ssafyebs.businessbe.global.exception.NoExistBusinessException;
import com.ssafyebs.businessbe.global.util.CryptoUtil;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import java.io.UnsupportedEncodingException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class BusinessServiceImpl implements BusinessService {
    final static Logger logger = LogManager.getLogger(BusinessServiceImpl.class);
    private final BusinessRepository businessRepository;
    private final JavaMailSender emailSender;
    private final RedisTemplate<String, Object> redisTemplate;
    @Value("${home-url}")
    String HOME_URL;
    @Value("${spring.redis.mail-expired-time}")
    int EXPIRATION_TIME;

    @Override
    public void create(BusinessCreationRequestDto businessCreationRequestDto) {
        //Redis email(sha) 로 저장
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(BusinessCreationRequestDto.class));
        Duration expireDuration = Duration.ofSeconds(EXPIRATION_TIME);
        String email = businessCreationRequestDto.getEmail();
        String code = CryptoUtil.Sha256.hash(String.format("%f%s%f",
                Math.random(),
                email,
                Math.random()));

        logger.warn("crypt code: " + code);

        redisTemplate.opsForValue().set(code, businessCreationRequestDto, expireDuration);

        //회원 정보 메일 발송
        try {// 예외처리
            MimeMessage message = createMessage(email, code); // 메일 발송
            emailSender.send(message);
        } catch (UnsupportedEncodingException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 생성에 문제가 있습니다.(UnsupportedEncodingException)");
        } catch (MessagingException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 생성에 문제가 있습니다.(MessagingException)");
        } catch (MailException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 전송에 문제가 있습니다.(MailException)");
        }
    }

    @Override
    public boolean checkEmail(BusinessEmailRequestDto businessEmailRequestDto) {
        String email = businessEmailRequestDto.getEmail();
        return businessRepository.existsByEmail(email);
    }

    @Override
    public void quit(long businessSeq) {
        Business business = businessRepository.findByBusinessSeq(businessSeq).orElseThrow(() -> new NoExistBusinessException("존재하는 회원정보가 없습니다."));
        Business quitBusiness = Business.builder()
                .businessSeq(business.getBusinessSeq())
                .owner(business.getOwner())
                .build();
        businessRepository.save(quitBusiness);
    }

    @Override
    public void resetPassword(long businessSeq) {
        if (!businessRepository.findEmailByBusinessSeq(businessSeq).isPresent()) {
            throw new NoExistBusinessException("존재하지 않는 사용자입니다.");
        }
        String email = businessRepository.findEmailByBusinessSeq(businessSeq).get().getEmail();

        //Redis email(sha) 로 저장
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(BusinessCreationRequestDto.class));
        Duration expireDuration = Duration.ofSeconds(EXPIRATION_TIME);
        String code = CryptoUtil.Sha256.hash(String.format("%f%s%f",
                Math.random(),
                email,
                Math.random()));

        logger.warn("crypt code: " + code);

        redisTemplate.opsForValue().set(code, email, expireDuration);

        //회원 정보 메일 발송
        try {// 예외처리
            MimeMessage message = createResetMessage(email, code); // 메일 발송
            emailSender.send(message);
        } catch (UnsupportedEncodingException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 생성에 문제가 있습니다.(UnsupportedEncodingException)");
        } catch (MessagingException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 생성에 문제가 있습니다.(MessagingException)");
        } catch (MailException e) {
            //e.printStackTrace();
            throw new MailSendException("메일 전송에 문제가 있습니다.(MailException)");
        }
    }

    public MimeMessage createMessage(String email, String key) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, email);// 보내는 대상
        message.setSubject("ebs 회원가입 이메일 인증");// 제목

        String msgg = "";
        msgg += "<div style='margin:100px;'>";
        msgg += "<h1> 안녕하세요</h1>";
        msgg += "<h1> ebs 입니다</h1>";
        msgg += "<br>";
        msgg += "<p>아래 링크를 클릭하시면 회원가입이 완료 됩니다.<p>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg += "<h3 style='color:blue;'>회원가입 링크입니다.</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "LINK : <strong>";
        msgg += "<a href=" + HOME_URL + "/business/verify-email/" + key + "> 회원가입 완료 링크" + "</href>";
        msgg += "</strong><div><br/> "; // 메일에 인증번호 넣기
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("ebsManger@gmail.com", "Ebs_Manager"));// 보내는 사람

        return message;
    }

    public MimeMessage createResetMessage(String email, String key) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, email);// 보내는 대상
        message.setSubject("ebs 비밀번호 재설정 인증");// 제목

        String msgg = "";
        msgg += "<div style='margin:100px;'>";
        msgg += "<h1> 안녕하세요</h1>";
        msgg += "<h1> ebs 입니다</h1>";
        msgg += "<br>";
        msgg += "<p>아래 링크를 클릭하시면 비밀번호 재설정 페이지로 이동합니다.<p>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg += "<h3 style='color:blue;'>비밀번호 재설정 링크입니다.</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "LINK : <strong>";
        msgg += "<a href=" + HOME_URL + "/business/reset-password/" + key + ">비밀번호 재설정 링크" + "</href>";
        msgg += "</strong><div><br/> "; // 메일에 인증번호 넣기
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("ebsManger@gmail.com", "Ebs_Manager"));// 보내는 사람

        return message;
    }
}
