package softwaretools.server02;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PathVariable;
import org.thymeleaf.context.Context;
import softwaretools.server02.model.Database;
import softwaretools.server02.model.Pair;
import softwaretools.server02.model.Unit;
import softwaretools.server02.model.Student;
import softwaretools.server02.model.internal.DatabaseImpl;
import java.util.*;

@RestController
public class Controller {

    @Autowired
    ResourceLoader loader;
    
    @Autowired
    Templates templates;

    @GetMapping("/")
    public ResponseEntity<Resource> mainPage() {
        Resource htmlfile = loader.getResource("classpath:web/index.html");
        return ResponseEntity
            .status(200)
            .header(HttpHeaders.CONTENT_TYPE, "text/html")
            .body(htmlfile);
    }

    @GetMapping("/units")
    public String unitsPage() {
        Database d = new DatabaseImpl();
        List<Unit> units = d.getUnits();
        Context cx = new Context();
        cx.setVariable("units", units);
        return templates.render("units.html", cx);
    }
    
    @GetMapping("/unit/{code}")
    public ResponseEntity<String> 
    unitDetailPage(@PathVariable String code) {
        Database d = new DatabaseImpl();
        Unit u = null;
        for (Unit uu : d.getUnits()) {
            if (uu.getCode().equals(code)) {
                u = uu;
                break;
            }
        }
        
        if (u == null) {
            return ResponseEntity
                .status(404)
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body("No unit with code " + code);
        }
        
        Context cx = new Context();
        cx.setVariable("unit", u);
        return ResponseEntity
            .status(200)
            .header(HttpHeaders.CONTENT_TYPE, "text/html")
            .body(templates.render("unit.html", cx));
    }

    @GetMapping("/students")
    public String studentsPage() {
        Database d = new DatabaseImpl();
        List<Student> students = d.getStudents();
        Context cx = new Context();
        cx.setVariable("students", students);
        return templates.render("students.html", cx);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<String> 
    StudentDetailPage(@PathVariable String id) {
        Database d = new DatabaseImpl();
        Student u = null;
        List<Pair<Unit, Integer>> results = null;
        int idInteger = Integer.parseInt(id);
        for (Student uu : d.getStudents()) {
            if (uu.getId() == idInteger) {
                u = uu;
                results = u.getGrades();
                break;
            }
        }
        
        if (u == null) {
            return ResponseEntity
                .status(404)
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body("No student with id " + id);
        }


        Context cx = new Context();
        cx.setVariable("student", u);
        cx.setVariable("results", results);
        return ResponseEntity
            .status(200)
            .header(HttpHeaders.CONTENT_TYPE, "text/html")
            .body(templates.render("student.html", cx));
    }
}
