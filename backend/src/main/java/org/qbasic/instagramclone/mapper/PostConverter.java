package org.qbasic.instagramclone.mapper;

import org.qbasic.instagramclone.dto.PostDto;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.repository.CommentRepository;
import org.qbasic.instagramclone.repository.LikeRepository;
import org.qbasic.instagramclone.service.LikeService;
import org.qbasic.instagramclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PostConverter {

    LikeRepository likeRepository;
    CommentRepository commentRepository;

    @Autowired
    public PostConverter(LikeRepository likeRepository, CommentRepository commentRepository) {
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }

    public PostDto convertToDto(Post obj) {
        String id = obj.getId().toString();
        String photo = obj.getPicture();
        String caption = obj.getCaption();
        String author = obj.getAuthor().getUsername();
        String authorPhoto = obj.getAuthor().getPhoto();
        Long likeCount = likeRepository.countByPost(obj);
        Long commentCount = commentRepository.countByPost(obj);
        Instant createdAt = obj.getCreatedAt();

        return new PostDto(id, photo, caption, author, authorPhoto, likeCount, commentCount, createdAt);
    }

}
