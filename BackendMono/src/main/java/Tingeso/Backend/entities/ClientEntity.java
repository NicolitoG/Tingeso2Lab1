package Tingeso.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "client")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long clientId;

    private String name;
    private String email;
    private int monthlyVisits;

    public int getMonthlyVisits() {
        return monthlyVisits;
    }

}
