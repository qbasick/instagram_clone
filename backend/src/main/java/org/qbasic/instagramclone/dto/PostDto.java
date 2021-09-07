package org.qbasic.instagramclone.dto;


import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PostDto {
    String id;
    String photo;
    String caption;
    String author;
    String authorPhoto;
    Long likeCount;
    Long commentCount;
    Instant createdAt;
}
