package Tingeso.Backend.repositories;

import Tingeso.Backend.entities.KartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KartRepository extends JpaRepository<KartEntity, Long> {
}
