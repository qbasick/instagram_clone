package org.qbasic.instagramclone.controller;

import org.qbasic.instagramclone.dto.ImageDto;
import org.qbasic.instagramclone.dto.LikeDto;
import org.qbasic.instagramclone.dto.PostDto;
import org.qbasic.instagramclone.mapper.PostConverter;
import org.qbasic.instagramclone.service.AuthService;
import org.qbasic.instagramclone.service.LikeService;
import org.qbasic.instagramclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;
    private final LikeService likeService;

    @Autowired
    public PostController(PostService postService, LikeService likeService) {
        this.postService = postService;
        this.likeService = likeService;
    }
    //fix
    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody ImageDto imageDto) {
        Long id = postService.createPost(imageDto.getPhoto(), imageDto.getCaption());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", id));
    }

    @PostMapping("/like")
    public ResponseEntity<?> likePost(@RequestBody LikeDto likeDto) {
        likeService.toggleLike(likeDto.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}/isliked")
    public ResponseEntity<?> isLiked(@PathVariable Long id) {
        if (likeService.isPostLikedByUser(id)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    //Unnecessary
    /*@GetMapping("/{id}/likes")
    public Long likeCount(@PathVariable String id) {
        return likeService.getLikeCount(Long.valueOf(id));
    }*/

    @GetMapping("/u/{username}/postcount")
    public Long postCount(@PathVariable String username) {
        return postService.postCount(username);
    }

    @GetMapping("/u/{username}")
    public List<PostDto> getPageOfPosts(@PathVariable String username, @RequestParam("page") int pageNumber) {
        return postService
                .loadPageOfPosts(username, pageNumber, 9);
    }

    @GetMapping("/{id}")
    public PostDto getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }

    @GetMapping("/u/{username}/timeline")
    public List<PostDto> getPageOfTimeline(@PathVariable String username, @RequestParam("page") int pageNumber) {
        return postService
                .loadTimelinePosts(username, pageNumber, 3);
    }


}
