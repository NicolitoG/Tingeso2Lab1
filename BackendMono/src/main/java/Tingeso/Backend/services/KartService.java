package tingeso.backend.services;

import tingeso.backend.entities.KartEntity;
import tingeso.backend.repositories.KartRepository;
import org.springframework.stereotype.Service;

@Service
public class KartService {
    final
    KartRepository kartRepository;

    public KartService(KartRepository kartRepository) {
        this.kartRepository = kartRepository;
    }

    public void changeKartStatus(KartEntity kart, int newState) {
        if (newState < 0 || newState > 2) {
            throw new IllegalArgumentException("Invalid state: " + newState);
        }
        kart.setState(newState);
        kartRepository.save(kart);
    }
}
