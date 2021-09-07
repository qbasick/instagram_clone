package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.Comment;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.UserAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByAuthor(UserAccount author, Pageable pageable);

    List<Post> findAllByAuthorInOrderByCreatedAtDesc(Iterable<UserAccount> users, Pageable pageable);

    Long countByAuthor(UserAccount author);
}
