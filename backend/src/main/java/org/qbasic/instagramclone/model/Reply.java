package org.qbasic.instagramclone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String commentText;
    private Instant createdAt;


    @ManyToOne(fetch = FetchType.LAZY)
    private UserAccount author;

    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;
}
