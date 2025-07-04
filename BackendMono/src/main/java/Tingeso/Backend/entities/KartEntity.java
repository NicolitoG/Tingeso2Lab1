package Tingeso.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "kart")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class KartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long kartId;

    private String code;
    private int state; //0 = available, 1 = in use, 2 = maintenance


    public void setKartId(Long kartId) {
        this.kartId = kartId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
