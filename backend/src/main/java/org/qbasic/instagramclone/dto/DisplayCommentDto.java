package org.qbasic.instagramclone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DisplayCommentDto {
    Long id;
    String postId;
    String username;
    String userPhoto;
    String text;
    Instant createdAt;
}
