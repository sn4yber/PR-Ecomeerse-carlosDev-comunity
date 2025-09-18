package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Categoria;
import java.util.List;
import java.util.Optional;
import com.example.E_comeerse.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    public  Categoria guardarCategoria(Categoria categoria){
       return categoriaRepository.save(categoria);
}
    public void eliminarCategoria(Long id){
       categoriaRepository.deleteById(id);}
}
