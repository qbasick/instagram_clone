package org.qbasic.instagramclone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"post_id", "user_id"})})
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public PostLike(UserAccount user, Post post) {
        this.user = user;
        this.post = post;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    private UserAccount user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

}
