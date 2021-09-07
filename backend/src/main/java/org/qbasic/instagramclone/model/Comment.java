package org.qbasic.instagramclone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String commentText;
    private Instant createdAt;

    public Comment(String text, UserAccount userAccount, Post post) {
        this.commentText = text;
        this.createdAt = Instant.now();
        //this.replies = new ArrayList<>();
        this.author = userAccount;
        this.post = post;
    }
    /*
    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @Column(name = "reply_id")
    private List<Reply> replies;
    */
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserAccount author;
}
