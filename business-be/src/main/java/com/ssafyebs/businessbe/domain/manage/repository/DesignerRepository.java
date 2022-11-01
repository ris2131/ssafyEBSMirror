package com.ssafyebs.businessbe.domain.manage.repository;

import com.ssafyebs.businessbe.domain.manage.entity.Designer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesignerRepository extends JpaRepository<Designer, Long> {
    List<Designer> findAllByBusinessBusinessSeq(long businessSeq);
    Optional<Designer> findDesignerByDesignerSeq(long designerSeq);
    boolean existsByDesignerSeqAndBusiness_BusinessSeq(long designerSeq, long businessSeq);
}
