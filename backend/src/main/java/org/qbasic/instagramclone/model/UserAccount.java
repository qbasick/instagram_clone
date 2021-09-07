package org.qbasic.instagramclone.model;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @EqualsAndHashCode.Include
    private String username;
    private String password;
    private Instant createdAt;
    private String photo;
    private String description;
    @Enumerated(EnumType.STRING)
    private Role role;


    public UserAccount(String username, String password) {
        this.username = username;
        this.password = password;
        this.createdAt = Instant.now();
        this.photo = "";
        this.description = "";
        this.followers = new HashSet<>();
        this.follows = new HashSet<>();
        this.role = Role.USER;
    }
/*
    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @Column(name = "post_id")
    private List<Post> posts;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @Column(name = "comment_id")
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "author")
    @Column(name = "reply_id")
    private List<Reply> replies;
    */
    @ManyToMany()
    @JoinTable(name = "followings",
                joinColumns = {@JoinColumn(name = "user_id")},
                inverseJoinColumns = {@JoinColumn(name = "follower_id")}
    )
    private Set<UserAccount> followers;

    @ManyToMany(mappedBy = "followers")
    private Set<UserAccount> follows;

    @Override
    public String toString() {
        return this.username + " " + this.id;
    }

}
