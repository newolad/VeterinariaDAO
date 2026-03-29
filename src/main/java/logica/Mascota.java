package logica;

import java.io.Serializable;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Entidad que representa una mascota registrada en el sistema.
 */
@Entity
@Table(name = "mascotas")
public class Mascota implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private int edad;
    private String tipo; // perro, gato, ave, etc.

    // Muchas mascotas pertenecen a un propietario
    @ManyToOne
    @JoinColumn(name = "propietario_id")
    private Propietario propietario;

    // Una mascota puede tener varias citas
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL)
    private List<Cita> citas;

    // Una mascota puede tener varios historiales
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL)
    private List<HistorialMedico> historiales;

    public Mascota() {}

    public Mascota(String nombre, int edad, String tipo, Propietario propietario) {
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
        this.propietario = propietario;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Propietario getPropietario() { return propietario; }
    public void setPropietario(Propietario propietario) { this.propietario = propietario; }

    public List<Cita> getCitas() { return citas; }
    public void setCitas(List<Cita> citas) { this.citas = citas; }

    public List<HistorialMedico> getHistoriales() { return historiales; }
    public void setHistoriales(List<HistorialMedico> historiales) { this.historiales = historiales; }
}
