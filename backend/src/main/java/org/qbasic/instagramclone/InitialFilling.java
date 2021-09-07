package org.qbasic.instagramclone;

import org.qbasic.instagramclone.model.*;
import org.qbasic.instagramclone.repository.CommentRepository;
import org.qbasic.instagramclone.repository.LikeRepository;
import org.qbasic.instagramclone.repository.PostRepository;
import org.qbasic.instagramclone.repository.UserRepository;
import org.qbasic.instagramclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.EntityManagerFactoryAccessor;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.Instant;
import java.util.HashSet;
@Component
public class InitialFilling/* implements CommandLineRunner */{

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;
    @Autowired
    PostRepository postRepository;
    @Autowired
    LikeRepository likeRepository;
    @Autowired
    CommentRepository commentRepository;

    //@Override
    @Transactional
    public void run(String... args) throws Exception {
        UserAccount first = new UserAccount(1L, "first", passwordEncoder.encode("pass"), Instant.now(), "first.jpg", "first user", Role.USER, new HashSet<>(), new HashSet<>());
        UserAccount second = new UserAccount(2L, "second", passwordEncoder.encode("pass"), Instant.now(), "second.jpg", "second user", Role.USER, new HashSet<>(), new HashSet<>());
        UserAccount third = new UserAccount(3L, "third", passwordEncoder.encode("pass"), Instant.now(), "third.jpg", "third user", Role.USER, new HashSet<>(), new HashSet<>());
        userRepository.saveAndFlush(first);
        userRepository.saveAndFlush(second);
        userRepository.saveAndFlush(third);
        userService.toggleFollow(userRepository.findUserAccountByUsername("second").get(), userRepository.findUserAccountByUsername("third").get());

        userService.toggleFollow(userRepository.findUserAccountByUsername("first").get(), userRepository.findUserAccountByUsername("third").get());
        //Post firstPost = new Post("a5c92bef-0308-413a-b15c-cb0ba0d9f7f7.jpg", first);
        Post firstPost = new Post(1L, Instant.now(), "young-woman-1149643_960_720.jpg","beautiful day", third);
        postRepository.saveAndFlush(firstPost);
        System.out.println("");
        postRepository.saveAndFlush(new Post(2L, Instant.now(), "c8b1b4d4-5174-47cf-b076-5e7fea9cf3da.jpg","keyboard", third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(3L, Instant.now(), "butterflies-1127666_960_720.jpg","cute butterfliesz", third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(4L, Instant.now(), "cat-2536662_960_720.jpg","cutie cattie puffy luffy" ,third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(5L, Instant.now(), "dove-2516641_960_720.jpg","bird", third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(6L, Instant.now(), "a5c92bef-0308-413a-b15c-cb0ba0d9f7f7.jpg", "anime", third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(7L, Instant.now(), "marguerite-729510_960_720.jpg", "flower??",third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(8L, Instant.now(), "tree-276014_960_720.jpg", "treeeees",third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(9L, Instant.now(), "typewriter-1248088_960_720.jpg", "old keyboard",third));
        System.out.println("");
        postRepository.saveAndFlush(new Post(10L, Instant.now(), "iceland-1979445_960_720.jpg","iceland is icy",third));
        likeRepository.saveAndFlush(new PostLike(1L, first, firstPost));

        Comment comment = new Comment("wow very cool", second, firstPost);
        commentRepository.save(comment);
        comment = new Comment("beautiful picture, you are awesome", first, firstPost);
        commentRepository.save(comment);
        comment = new Comment("agree with your opinino", second, firstPost);
        commentRepository.save(comment);
        comment = new Comment("keep it up", first, firstPost);
        commentRepository.save(comment);
        //System.out.println(userRepository.recommendUsers(1L));

    }
}
