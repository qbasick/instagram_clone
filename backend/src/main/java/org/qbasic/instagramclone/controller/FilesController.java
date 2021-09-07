package org.qbasic.instagramclone.controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.qbasic.instagramclone.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FilesController {

    private final StorageService storageService;

    @Autowired
    public FilesController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        return storageService.store(file);
    }

    @GetMapping(value = "/{filename:.+}", produces = MediaType.IMAGE_JPEG_VALUE)
    public Resource getFile(@PathVariable String filename) {
        return storageService.loadAsResource(filename);
    }

    /* It is more performant to use RandomAccessFile
     but only available if we use file system implementation on our own machine.
     In case if we can't access file system directly this interface is more optimal choice
     */
    @GetMapping(value = "/videos/{filename:.+}")
    public ResponseEntity<ResourceRegion> getVideos(@PathVariable String filename, @RequestHeader HttpHeaders headers) throws IOException {
        Resource video = storageService.loadAsResource(filename);
        long contentLength = video.contentLength();
        List<HttpRange> range = headers.getRange();

        long start = 0;
        long end = contentLength - 1;
        long rangeLength = Math.min(512 * 1024, contentLength);

        if (range.size() > 0) {
            start = range.get(0).getRangeStart(contentLength);
            end = range.get(0).getRangeEnd(contentLength);
            rangeLength = Math.min(512 * 1024, end - start + 1);
        }

        ResourceRegion region = new ResourceRegion(video, start, rangeLength);
        return ResponseEntity
                .status(HttpStatus.PARTIAL_CONTENT)
                .contentType(
                        MediaTypeFactory
                                .getMediaType(video)
                                .orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(region);
    }

    /*
    @GetMapping(value = "/videos/{filename:.+}")
    public ResponseEntity<byte[]> getVideos(@PathVariable String filename, @RequestHeader HttpHeaders headers) throws IOException {
        String path = "C:\\Documents and Settings\\anton\\Documents\\java_projects\\instagram-clone\\backend\\images\\Interstellar - Docking Scene (HDR - 4K - 5.1).mp4";
        RandomAccessFile raf = new RandomAccessFile(path, "r");
        long cl = raf.length();
        var range = headers.getRange();
        byte[] altRegion;
        String cr;
        long rangeLength;
        if (range.size() > 0) {
            var start = range.get(0).getRangeStart(cl);
            var end = range.get(0).getRangeEnd(cl);
            rangeLength = Math.min(1 * 1024 * 1024, end - start + 1);
            cr = String.format("bytes %d-%d/%d", start, start + rangeLength - 1, cl);
            raf.seek(start);
            altRegion = new byte[(int) rangeLength];
            raf.read(altRegion);

        } else {
            rangeLength = Math.min(1 * 1024 * 1024, cl);
            altRegion = new byte[(int) rangeLength];
            raf.read(altRegion);
            cr = String.format("bytes %d-%d/%d", 0, rangeLength, cl);

        }
        raf.close();
        System.out.println(cr + "    " + rangeLength + "           " + cl);
       return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
               .contentType(MediaTypeFactory
                       .getMediaType(path)
                       .orElse(MediaType.APPLICATION_OCTET_STREAM))
               .contentLength(rangeLength)
               .header("Content-range", cr)
               .body(altRegion);
    }
    /*
    public byte[] getFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadAsResource(filename);
        InputStream in = file.getInputStream();
        byte[] res = new byte[in.available()];
        in.read(res);
        return res;
    }
    /*public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }*/
}
