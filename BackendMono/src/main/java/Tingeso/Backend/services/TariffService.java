package Tingeso.Backend.services;

import Tingeso.Backend.entities.TariffEntity;
import Tingeso.Backend.repositories.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TariffService {
    @Autowired
    TariffRepository tariffRepository;

    public double getBasePrice(int bookingType) {
        TariffEntity tariff = tariffRepository.findByBookingType(bookingType);
        if (tariff != null) {
            return tariff.getBasePrice();
        } else {
            throw new IllegalArgumentException("Tariff not found for booking type: " + bookingType);
        }
    }
}
