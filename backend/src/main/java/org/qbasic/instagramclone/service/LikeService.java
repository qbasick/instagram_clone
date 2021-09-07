package org.qbasic.instagramclone.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.qbasic.instagramclone.exception.PostNotFoundException;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.PostLike;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.repository.LikeRepository;
import org.qbasic.instagramclone.repository.PostRepository;
import org.qbasic.instagramclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final AuthService authService;

    @Autowired
    public LikeService(LikeRepository likeRepository,
                       PostRepository postRepository,
                       AuthService authService) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.authService = authService;
    }
    @Transactional
    public void toggleLike(Long postId) {
        Post post = postRepository.getById(postId);
        UserAccount userAccount = authService.getCurrentUser();
        Optional<PostLike> postLike = likeRepository.findPostLikeByPostAndUser(post, userAccount);
        if (postLike.isPresent()) {
            likeRepository.delete(postLike.get());
        } else {
            likeRepository.save(new PostLike(userAccount, post));
        }
        likeRepository.flush();
    }

    // this should be only about current user
    public boolean isPostLikedByUser(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException("Such post doesn't exist"));
        UserAccount userAccount = authService.getCurrentUser();
        Optional<PostLike> like = likeRepository.findPostLikeByPostAndUser(post, userAccount);
        return like.isPresent();
    }

    public Long getLikeCount(Long postId) {
        Post post = postRepository.getById(postId);
        return likeRepository.countByPost(post);
    }
}
