package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.Comment;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.UserAccount;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostOrderByCreatedAtDesc(Post post, Pageable pageable);

    Long countByPost(Post post);
}
