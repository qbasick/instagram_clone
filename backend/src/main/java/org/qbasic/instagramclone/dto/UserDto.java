package org.qbasic.instagramclone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    String username;
    String photo;
    String description;
}
