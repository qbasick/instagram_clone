package org.qbasic.instagramclone.controller;

import org.qbasic.instagramclone.dto.UserDto;
import org.qbasic.instagramclone.mapper.UserConverter;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.service.AuthService;
import org.qbasic.instagramclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/users")
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Do we return anything?
    @PostMapping("/follow/{username}")
    public ResponseEntity<Void> toggleFollow(@PathVariable String username) {
        userService.toggleFollow(username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/find")
    public List<UserDto> searchByUsername(@RequestParam String fragment) {
        return userService.getUserWithUsernameContaining(fragment);
    }

    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userService.getUser(username);
    }

    @GetMapping("/recommend")
    public List<UserDto> getRecommendations() {
        //String currentUser = authService.getCurrentUser().getUsername();
        return userService.recommendations();
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        userService.updateUser(userDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/follow/followers/{username}")
    public List<UserDto> getFollowers(@PathVariable String username) {
        return userService.getFollowers(username);
    }

    @GetMapping("/follow/following/{username}")
    public List<UserDto> getFollowing(@PathVariable String username) {
        return userService.getFollowingList(username);
    }

}
