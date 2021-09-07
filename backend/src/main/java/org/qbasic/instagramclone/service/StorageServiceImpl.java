package org.qbasic.instagramclone.service;

import org.qbasic.instagramclone.InstagramCloneApplication;
import org.qbasic.instagramclone.exception.InstagramFileHandlingException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class StorageServiceImpl implements StorageService {

    private final Path root = Paths.get("images");


    @Override
    @PostConstruct
    public void init() {
        if (Files.notExists(root)) {
            try {
                Files.createDirectory(root);
            } catch (IOException e) {
                throw new InstagramFileHandlingException("Could not create file");
            }
        }
    }

    @Override
    public String store(MultipartFile file) {
        String filename = file.getOriginalFilename();
        String extension = ".jpg";
        if (filename != null) {
            extension = filename.substring(filename.lastIndexOf('.'));
        }
        String uuid = UUID.randomUUID().toString() + extension;
        try {
            Files.copy(file.getInputStream(), this.root.resolve(uuid));
            return uuid;
        } catch (IOException e) {
            throw new InstagramFileHandlingException("File storing exception " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(root, 1);
        } catch (Exception e) {
            throw new InstagramFileHandlingException(e.getMessage());
        }

    }

    @Override
    public Path load(String filename) {
        return this.root.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path path = root.resolve(filename);
            Resource resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new InstagramFileHandlingException("cannot load file");
            }
        } catch (Exception e) {
            throw new InstagramFileHandlingException("file handling error");
        }
    }

    // implement if necessary
    @Override
    public void deleteAll() {
    }
}
