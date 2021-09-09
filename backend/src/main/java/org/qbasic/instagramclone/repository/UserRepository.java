package org.qbasic.instagramclone.repository;

import org.qbasic.instagramclone.model.UserAccount;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findUserAccountByUsername(String username);
    /** Simple analytical request
     * for recommendations placeholder, should be
     * rewritten with usage of more complex
     * algorithms or machine learning
     * **/
    @Query(nativeQuery = true, value =
        "select * from user_account \n" +
                "where id in (select follower_id from followings where follower_id not in (\n" +
                "            select a.follower_id from followings a join followings b on\n" +
                "            a.follower_id = b.user_id and a.user_id = b.follower_id\n" +
                "            where a.user_id = ?1) and user_id = ?1)\n" +
                "limit 15;"
    )
    Set<UserAccount> recommendUsers(Long id);

    List<UserAccount> getUserAccountByUsernameContainingIgnoreCase(String s, Pageable pageable);
}
