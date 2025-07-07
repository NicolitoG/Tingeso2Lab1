package tingeso.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "client")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long clientId;

    private String name;
    private String email;
    private int monthlyVisits;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date birthDate;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Long getClientId() {
        return clientId;
    }

}
