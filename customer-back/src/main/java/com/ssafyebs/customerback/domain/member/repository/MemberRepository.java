package com.ssafyebs.customerback.domain.member.repository;


import com.ssafyebs.customerback.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Member findByMemberUid(String memberUid);
}
