package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.Comment;
import org.qbasic.instagramclone.model.Post;
import org.qbasic.instagramclone.model.Reply;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findAllByComment(Comment comment, Pageable pageable);
}
