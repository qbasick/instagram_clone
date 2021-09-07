package org.qbasic.instagramclone.service;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.qbasic.instagramclone.dto.DisplayCommentDto;
import org.qbasic.instagramclone.dto.PublishCommentDto;
import org.qbasic.instagramclone.exception.PostNotFoundException;
import org.qbasic.instagramclone.mapper.CommentConverter;
import org.qbasic.instagramclone.model.Comment;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.Reply;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.repository.CommentRepository;
import org.qbasic.instagramclone.repository.PostRepository;
import org.qbasic.instagramclone.repository.ReplyRepository;
import org.qbasic.instagramclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Setter
@Getter
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ReplyRepository replyRepository;
    private final AuthService authService;
    private final CommentConverter commentConverter;

    @Autowired
    public CommentService(CommentRepository commentRepository,
                          PostRepository postRepository,
                          UserRepository userRepository,
                          ReplyRepository replyRepository,
                          AuthService authService,
                          CommentConverter commentConverter) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.replyRepository = replyRepository;
        this.authService = authService;
        this.commentConverter = commentConverter;
    }

    public Long saveComment(PublishCommentDto commentDto) {
        // user not found exception
        UserAccount userAccount = authService.getCurrentUser();
        // post not found exception
        Post post = postRepository.findById(Long.valueOf(commentDto.getPostId()))
                .orElseThrow(() -> new PostNotFoundException("Post id " + commentDto.getPostId() + " not found"));
        Comment comment = new Comment(commentDto.getText(), userAccount, post);
        return commentRepository.save(comment).getId();
    }
    /*
    public void loadUserComments() {
    }
    */
    public List<DisplayCommentDto> loadCommentsToPost(Long postId, int pageNumber, int pageSize) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException("Post id " + postId + " not found"));
        List<Comment> comments = commentRepository.findAllByPostOrderByCreatedAtDesc(post, PageRequest.of(pageNumber, pageSize));
        return comments.stream().map(commentConverter::convertToDto).collect(Collectors.toList());
    }
    //fix later
    public List<Reply> loadRepliesToComment(Long commentId, int pageNumber, int pageSize) {
        Comment comment = commentRepository.getById(commentId);
        return replyRepository.findAllByComment(comment, PageRequest.of(pageNumber, pageSize));
    }


}
