package tingeso.backend.services;

import tingeso.backend.entities.TariffEntity;
import tingeso.backend.repositories.TariffRepository;
import org.springframework.stereotype.Service;

@Service
public class TariffService {
    final
    TariffRepository tariffRepository;

    public TariffService(TariffRepository tariffRepository) {
        this.tariffRepository = tariffRepository;
    }

    public TariffEntity saveTariff(TariffEntity tariff) {
        return tariffRepository.save(tariff);
    }
}
