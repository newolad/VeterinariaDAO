package logica;

import java.io.Serializable;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Entidad que representa a un veterinario del sistema.
 */
@Entity
@Table(name = "veterinarios")
public class Veterinario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private String especialidad;
    private String contacto;

    // Un veterinario puede tener varias citas
    @OneToMany(mappedBy = "veterinario", cascade = CascadeType.ALL)
    private List<Cita> citas;

    // Un veterinario puede tener varios historiales
    @OneToMany(mappedBy = "veterinario", cascade = CascadeType.ALL)
    private List<HistorialMedico> historiales;

    public Veterinario() {}

    public Veterinario(String nombre, String especialidad, String contacto) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.contacto = contacto;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    public String getContacto() { return contacto; }
    public void setContacto(String contacto) { this.contacto = contacto; }

    public List<Cita> getCitas() { return citas; }
    public void setCitas(List<Cita> citas) { this.citas = citas; }

    public List<HistorialMedico> getHistoriales() { return historiales; }
    public void setHistoriales(List<HistorialMedico> historiales) { this.historiales = historiales; }
}
