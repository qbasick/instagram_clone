package org.qbasic.instagramclone.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.qbasic.instagramclone.dto.UserDto;
import org.qbasic.instagramclone.mapper.UserConverter;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Service

public class UserService {

    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final AuthService authService;


    @Autowired
    public UserService(UserRepository userRepository,
                       UserConverter userConverter,
                       AuthService authService) {
        this.userRepository = userRepository;
        this.userConverter = userConverter;
        this.authService = authService;
    }

    public UserDto getUser(String name) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(name).orElseThrow(() -> new UsernameNotFoundException(name + " not found"));
        return userConverter.convertToDto(userAccount);
    }

    public List<UserDto> getUserWithUsernameContaining(String s) {
        List<UserAccount> userAccounts = userRepository.getUserAccountByUsernameContainingIgnoreCase(s, PageRequest.of(0, 10));
        return userAccounts
                .stream()
                .map(userConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public void updateUser(UserDto userDto) {
        UserAccount userAccount = authService.getCurrentUser();
        if (userDto.getDescription() != null) {
            userAccount.setDescription(userDto.getDescription());
        }
        if (userDto.getPhoto() != null) {
            userAccount.setPhoto(userDto.getPhoto());
        }
        userRepository.saveAndFlush(userAccount);
    }

    public List<UserDto> getFollowers(String name) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(name).orElseThrow(() -> new UsernameNotFoundException(name + " not found"));
        return userAccount
                .getFollowers()
                .stream()
                .map(userConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> recommendations() {
        UserAccount userAccount = authService.getCurrentUser();
        //UserAccount userAccount = userRepository.findUserAccountByUsername(name).orElseThrow(() -> new UsernameNotFoundException(name + " not found"));
        return userRepository
                .recommendUsers(userAccount.getId())
                .stream().map(userConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getFollowingList(String name) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(name)
                .orElseThrow(() -> new UsernameNotFoundException(name + " not found"));
        return userAccount
                .getFollows()
                .stream()
                .map(userConverter::convertToDto)
                .collect(Collectors.toList());
    }
    @Transactional
    public void toggleFollow(String whoIsFollowed) {
        UserAccount whoFollows = authService.getCurrentUser();
        UserAccount whoIsFollowedAcc = userRepository.findUserAccountByUsername(whoIsFollowed)
                .orElseThrow(() -> new UsernameNotFoundException(whoIsFollowed + " not found"));
        toggleFollow(whoFollows, whoIsFollowedAcc);
    }

    @Transactional
    public void toggleFollow(UserAccount whoFollows, UserAccount whoIsFollowed) {
        Set<UserAccount> followList = whoIsFollowed.getFollowers();
        if (followList.contains(whoFollows)) {
            followList.remove(whoFollows);
        } else {
            followList.add(whoFollows);
        }
        userRepository.flush();
    }

}
