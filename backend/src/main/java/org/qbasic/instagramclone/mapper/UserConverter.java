package org.qbasic.instagramclone.mapper;

import org.qbasic.instagramclone.dto.UserDto;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserConverter implements DtoConverter<UserDto, UserAccount> {

    /*private final UserService userService;

    @Autowired
    public UserConverter(UserService userService) {
        this.userService = userService;
    }
*/
    @Override
    public UserDto convertToDto(UserAccount obj) {
        return new UserDto(obj.getUsername(), obj.getPhoto(), obj.getDescription());
    }

    @Override
    public UserAccount convertFromDto(UserDto obj) {
        return null;
    }
}
