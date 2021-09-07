package org.qbasic.instagramclone.service;

import org.qbasic.instagramclone.dto.PostDto;
import org.qbasic.instagramclone.exception.PostNotFoundException;
import org.qbasic.instagramclone.mapper.PostConverter;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.UserAccount;
import org.qbasic.instagramclone.repository.PostRepository;
import org.qbasic.instagramclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostConverter postConverter;
    private final AuthService authService;

    @Autowired
    public PostService(PostRepository postRepository,
                       UserRepository userRepository,
                       PostConverter postConverter,
                       AuthService authService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postConverter = postConverter;
        this.authService = authService;
    }

    public Long createPost(String pictureUrl, String caption) {
        UserAccount userAccount = authService.getCurrentUser();
        Post post = new Post(pictureUrl, caption, userAccount);
        return postRepository.save(post).getId();
    }

    public List<PostDto> loadPageOfPosts(String username, int pageNumber, int pageSize) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        return postRepository
                .findAllByAuthor(userAccount, PageRequest.of(pageNumber, pageSize))
                .stream()
                .map(postConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDto getPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException("Such post doesn't exist yet"));
        return postConverter.convertToDto(post);
    }

    public List<PostDto> loadTimelinePosts(String username, int pageNumber, int pageSize) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        Set<UserAccount> followings = userAccount.getFollows();
        System.out.println(followings);
        return postRepository
                .findAllByAuthorInOrderByCreatedAtDesc(followings, PageRequest.of(pageNumber, pageSize))
                .stream()
                .map(postConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public Long postCount(String username) {
        UserAccount userAccount = userRepository.findUserAccountByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));

        return postRepository.countByAuthor(userAccount);
    }

}
