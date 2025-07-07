package tingeso.backend.repositories;

import tingeso.backend.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    ClientEntity findByName(String name);
    ClientEntity findByNameAndEmail(String name, String email);


}
