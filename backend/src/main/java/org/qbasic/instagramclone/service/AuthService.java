package org.qbasic.instagramclone.service;

import lombok.Getter;
import lombok.Setter;
import org.qbasic.instagramclone.dto.AuthRequest;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.repository.UserRepository;
import org.qbasic.instagramclone.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Getter
@Setter
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.authenticationManager = authenticationManager;
    }

    public boolean register(AuthRequest user) {
        Optional<UserAccount> userAccount = userRepository.findUserAccountByUsername(user.getUsername());
        if (userAccount.isEmpty()) {
            userRepository.save(new UserAccount(user.getUsername(), passwordEncoder.encode(user.getPassword())));
            return true;
        }
        return false;
    }

    public UserAccount getCurrentUser() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findUserAccountByUsername(principal.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("No user found"));
    }

    public String authorize(AuthRequest user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        return token;
    }


}
