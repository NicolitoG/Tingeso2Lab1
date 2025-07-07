package tingeso.backend.services;

import tingeso.backend.repositories.KartRepository;
import org.springframework.stereotype.Service;

@Service
public class KartService {
    final
    KartRepository kartRepository;

    public KartService(KartRepository kartRepository) {
        this.kartRepository = kartRepository;
    }

}
