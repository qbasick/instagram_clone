package org.qbasic.instagramclone.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant createdAt;
    private String picture;
    private String caption;

    public Post(String picture, String caption, UserAccount author) {
        this.picture = picture;
        this.createdAt = Instant.now();
        this.caption = caption;
        //this.comments = new ArrayList<>();
        this.author = author;
    }
/*
    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @Column(name = "comment_id")
    private List<Comment> comments;
*/
    @ManyToOne(fetch = FetchType.LAZY)
    private UserAccount author;
    /*
    @Formula("(SELECT COUNT(*) FROM post_like a WHERE a.post_id = id)")
    private Long likeCount;*/
}
