package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.PostLike;
import org.qbasic.instagramclone.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findPostLikeByPostAndUser(Post post, UserAccount user);

    Long countByPost(Post post);
}
