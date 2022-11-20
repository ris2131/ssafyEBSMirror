package com.ssafyebs.customerback.domain.member.controller;


import com.ssafyebs.customerback.domain.member.dto.GoogleLoginRequestDto;
import com.ssafyebs.customerback.domain.member.dto.MemberGoogleRequestDto;
import com.ssafyebs.customerback.domain.member.dto.MemberResponseDto;
import com.ssafyebs.customerback.domain.member.dto.MemberUpdateInfoRequestDto;
import com.ssafyebs.customerback.domain.member.service.MemberService;
import com.ssafyebs.customerback.global.exception.NoExistMemberException;
import com.ssafyebs.customerback.global.exception.NoGoogleAuthorizeException;
import com.ssafyebs.customerback.global.jwt.JwtService;
import com.ssafyebs.customerback.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final JwtService jwtService;


	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody GoogleLoginRequestDto googleLoginRequestDto) {
		try {
			MemberResponseDto memberResponseDto = memberService.loginOAuthGoogle(googleLoginRequestDto);

			String memberUid = memberResponseDto.getMemberUid();

			String accessToken = jwtService.createAccessToken(memberUid);
			String refreshToken = jwtService.createRefreshToken();

			HttpHeaders headers = memberService.createTokenHeader(accessToken, refreshToken);
			memberService.updateRefreshToken(memberUid, refreshToken);

			return ResponseEntity.status(HttpStatus.OK).headers(headers).body(CommonResponse.createSuccess("로그인 성공적으로 완료 되었습니다.", memberResponseDto));
		} catch (NoExistMemberException e) {
			return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("첫 로그인 구글 인증 완료", null));
		} catch (NoGoogleAuthorizeException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.createSuccess("구글 로그인 실패", null));
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> createGoogleMember(@RequestBody MemberGoogleRequestDto memberGoogleRequestDto){


			String refreshToken = jwtService.createRefreshToken();

			MemberResponseDto memberResponseDto = memberService.signUpOauthGoogle(memberGoogleRequestDto, refreshToken);
			String memberUid = memberService.getMemberUid(memberGoogleRequestDto.getIdToken());


			String accessToken = jwtService.createAccessToken(memberUid);
			HttpHeaders headers = memberService.createTokenHeader(accessToken, refreshToken);

			return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(CommonResponse.createSuccess("구글 회원가입이 완료되었습니다.", memberResponseDto));

	}

	@GetMapping()
	public ResponseEntity<?> getMember(HttpServletRequest request){
		String memberuid = (String) request.getAttribute("memberuid");
		MemberResponseDto memberResponseDto = memberService.getMemberInfo(memberuid);
		return ResponseEntity.status(HttpStatus.CREATED).body(CommonResponse.createSuccess("회원정보 확인 완료.", memberResponseDto));
	}

	@PutMapping()
	public ResponseEntity<?> updateMemberInfo(HttpServletRequest request, @RequestBody MemberUpdateInfoRequestDto memberUpdateInfoRequestDto){
		String memberUid = (String) request.getAttribute("memberuid");

		MemberResponseDto memberResponseDto = memberService.updateMemberInfo(memberUid, memberUpdateInfoRequestDto);

		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("회원정보 수정이 완료되었습니다.",memberResponseDto));
	}

	@PutMapping("/quit")
	public ResponseEntity<?> updateMemberInfo(HttpServletRequest request){
		String memberUid = (String) request.getAttribute("memberuid");

		memberService.quitUser(memberUid);

		return ResponseEntity.status(HttpStatus.OK).body(CommonResponse.createSuccess("회원탈퇴가 완료되었습니다.",null));
	}

}
		// 카카오 로그인인 경우
//		if (loginType.equals("K")) {
//			String reqURL = "https://kapi.kakao.com/v2/user/me";
//
//			try {
//				URL url = new URL(reqURL);
//				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//				conn.setRequestMethod("POST");
//				conn.setDoOutput(true);
//				conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//				int responseCode = conn.getResponseCode();
//				System.out.println("responseCode : " + responseCode);
//
//				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//				String line = "";
//				String result = "";
//
//				while ((line = br.readLine()) != null) {
//					result += line;
//				}
//				System.out.println("response body : " + result);
//
//				JsonParser parser = new JsonParser();
//				JsonElement element = parser.parse(result);
//
//				String id = Long.toString(element.getAsJsonObject().get("id").getAsLong());
//				// String nickname =
//				// element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
//
//				System.out.println("id : " + id);
//
//				Optional<User> user = userService.findByUserUid(id);
//				// db에 존재하는 회원이라면
//				if (user.isPresent()) {
//					resultMap.put("userTeamname", user.get().getUserTeamname());
//					resultMap.put("jwt", jwtService.createJwt(user.get().getUserUid()));
//					resultMap.put("message", "success");
//					status = HttpStatus.OK;
//				}
//				// db에 없는 경우 회원가입 하라고 보내야 한다.
//				else {
//					resultMap.put("loginType", "K");
//					resultMap.put("uid", id);
//					resultMap.put("message", "회원가입을 먼저 해주세요.");
//					status = HttpStatus.ACCEPTED;
//				}
//
//			} catch (IOException e) {
//				e.printStackTrace();
//				resultMap.put("message", e.getMessage());
//				status = HttpStatus.INTERNAL_SERVER_ERROR;
//			}
//		}
//
//		else if(loginType.equals("N")) {
//			String reqURL = "https://openapi.naver.com/v1/nid/me";
//			try {
//	            URL url = new URL(reqURL);
//	            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//	            conn.setRequestMethod("POST");
//
//	            //    요청에 필요한 Header에 포함될 내용
//	            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//	            int responseCode = conn.getResponseCode();
//	            System.out.println("responseCode : " + responseCode);
//
//	            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//
//	            String line = "";
//	            String result = "";
//
//	            while ((line = br.readLine()) != null) {
//	                result += line;
//	            }
//	            System.out.println("response body : " + result);
//
//	            JsonParser parser = new JsonParser();
//	            JsonElement element = parser.parse(result);
//
//	            String id = element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString();
//	            System.out.println("id : " + id);
//
//	            Optional<User> user = userService.findByUserUid(id);
//				// 이미 db에 존재하는 회원이라면
//				if (user.isPresent()) {
//					resultMap.put("uid", user.get().getUserUid());
//					resultMap.put("jwt", jwtService.createJwt(user.get().getUserUid()));
//					resultMap.put("message", "success");
//					status = HttpStatus.OK;
//				}
//				// db에 없는 경우 회원가입 하라고 보내야 한다.
//				else {
//					resultMap.put("loginType", "N");
//					resultMap.put("uid", id);
//					resultMap.put("message", "회원가입을 먼저 해주세요.");
//					status = HttpStatus.ACCEPTED;
//				}
//	        } catch (IOException e) {
//	        	e.printStackTrace();
//				resultMap.put("message", e.getMessage());
//				status = HttpStatus.INTERNAL_SERVER_ERROR;
//	        }
//		}
//
//
//		if(loginType.equals("G")) {
//			String reqURL = "https://www.googleapis.com/oauth2/v3/userinfo";
//
//			try {
//				URL url = new URL(reqURL);
//				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//				conn.setRequestMethod("GET");
//				conn.setDoOutput(true);
//				conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//				int responseCode = conn.getResponseCode();
//				System.out.println("responseCode : " + responseCode);
//
//				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//				String line = "";
//				String result = "";
//
//				while ((line = br.readLine()) != null) {
//					result += line;
//				}
//				System.out.println("response body : " + result);
//
//				JsonParser parser = new JsonParser();
//				JsonElement element = parser.parse(result);
//
//				String id = element.getAsJsonObject().get("sub").getAsString();
//				// String nickname =
//				// element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
//
//				System.out.println("id : " + id);
//
//				Optional<Member> member = memberService.findByMemberUid(id);
//				// 이미 db에 존재하는 회원이라면
//				if (member.isPresent()) {
//					resultMap.put("uid", member.get().getMemberUid());
//					//resultMap.put("jwt", jwtService.createJwt(member.get().getMemberUid()));
//					resultMap.put("message", "success");
//					status = HttpStatus.OK;
//				}
//				// db에 없는 경우 회원가입 하라고 보내야 한다.
//				else {
//					resultMap.put("loginType", "G");
//					resultMap.put("uid", id);
//					resultMap.put("message", "회원가입을 먼저 해주세요.");
//					status = HttpStatus.ACCEPTED;
//				}
//
//			} catch (IOException e) {
//				e.printStackTrace();
//				resultMap.put("message", e.getMessage());
//				status = HttpStatus.INTERNAL_SERVER_ERROR;
//			}
//
//		}
//		return new ResponseEntity<>(resultMap, status);


