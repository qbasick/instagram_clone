package org.qbasic.instagramclone.mapper;

import org.qbasic.instagramclone.dto.DisplayCommentDto;
import org.qbasic.instagramclone.dto.PublishCommentDto;
import org.qbasic.instagramclone.model.Comment;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.service.PostService;
import org.qbasic.instagramclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class CommentConverter implements DtoConverter<DisplayCommentDto, Comment> {


    UserService userService;
    PostService postService;
    @Autowired
    public CommentConverter(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @Override
    public DisplayCommentDto convertToDto(Comment obj) {
        String postId = obj.getPost().getId().toString();
        String username = obj.getAuthor().getUsername();
        String userPhoto = obj.getAuthor().getPhoto();
        String text = obj.getCommentText();
        Instant createdAt = obj.getCreatedAt();

        return new DisplayCommentDto(obj.getId(), postId, username, userPhoto, text, createdAt);
    }

    @Override
    public Comment convertFromDto(DisplayCommentDto obj) {
        return null;
    }
}
