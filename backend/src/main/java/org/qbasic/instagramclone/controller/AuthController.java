package org.qbasic.instagramclone.controller;

import lombok.NoArgsConstructor;
import lombok.Setter;
import org.qbasic.instagramclone.dto.AuthRequest;
import org.qbasic.instagramclone.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/auth")
@NoArgsConstructor
@Setter
@CrossOrigin(origins = "*")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest authRequest) {
        if (authService.register(authRequest)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        String token = authService.authorize(authRequest);
        return ResponseEntity.ok(token);
    }


}
