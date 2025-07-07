package tingeso.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tingeso.backend.entities.KartEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface KartRepository extends JpaRepository<KartEntity, Long> {
}
