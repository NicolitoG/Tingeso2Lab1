package Tingeso.Backend.services;

import Tingeso.Backend.entities.KartEntity;
import Tingeso.Backend.repositories.KartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class KartService {
    @Autowired
    KartRepository kartRepository;

    public void changeKartStatus(KartEntity kart, int newState) {
        if (newState < 0 || newState > 2) {
            throw new IllegalArgumentException("Invalid state: " + newState);
        }
        kart.setState(newState);
        kartRepository.save(kart);
    }
}
