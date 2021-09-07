package org.qbasic.instagramclone.controller;

import org.qbasic.instagramclone.dto.PublishCommentDto;
import org.qbasic.instagramclone.dto.DisplayCommentDto;
import org.qbasic.instagramclone.mapper.CommentConverter;
import org.qbasic.instagramclone.service.AuthService;
import org.qbasic.instagramclone.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    public Long postComment(@RequestBody PublishCommentDto comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping("/by-post/{id}")
    public List<DisplayCommentDto> loadAllCommentsToPost(@PathVariable Long id, @RequestParam("page") int pageNumber) {
        return commentService.loadCommentsToPost(id, pageNumber, 3);
    }

    public void postReply() {

    }

    public void loadAllReplies() {

    }
}
