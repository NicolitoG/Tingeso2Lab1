package Tingeso.Backend.services;

import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.repositories.TariffRepository;
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
