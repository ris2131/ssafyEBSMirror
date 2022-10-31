package com.ssafyebs.businessbe.domain.business.controller;

import com.ssafyebs.businessbe.domain.business.service.MailServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@AllArgsConstructor
@SuppressWarnings("FieldCanBeLocal")
@RequestMapping(value = "/business")
public class MailController {
    private final MailServiceImpl mailService;

    private final String HTML_RESPONSE_HEAD = "<!doctype html>\n" +
            "<html> \n" +
            "    <head>\n";
    private final String HTML_RESPONSE_FOOT = "        </script>\n" +
            "    </head>\n" +
            "<script defer>\n" +
            "   window.close()" +
            "</script>\n" +
            "</html>";

    @GetMapping("/verify-email/{emailVerificationKey}")
    public void verifyEmail(@PathVariable String emailVerificationKey, HttpServletResponse response) throws IOException {
        String script;
        try {
            mailService.verifyEmail(emailVerificationKey);
            script = "        <title>이메일 인증</title>" +
                    "        <script>\n" +
                    "            alert(\"인증이 완료되었습니다.\");\n";
        } catch (Exception e) {
            script = "        <title>ERROR</title>" +
                    "        <script>\n" +
                    "            alert(\"잘못된 접근입니다.\");\n";
        }
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(HTML_RESPONSE_HEAD + script + HTML_RESPONSE_FOOT);
    }
}
