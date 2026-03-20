const fs = require('fs');

const fragments = [
    // --- Infrastructure ---
    "avformat", "avcodec", "avfilter", "avfcbridge", "swresample",

    // --- Audio Filters ---
    "audio-filters",

    // --- All Audio Codecs (Decoders & Encoders) ---
    "codec-aac", "codec-alac", "codec-flac", "codec-libopus", "codec-libvorbis", 
    "codec-pcm_f32le", "codec-mp3", "decoder-mp3", "encoder-libmp3lame",
    "decoder-aac", "encoder-aac", "decoder-ac3", "decoder-alac", "encoder-alac",
    "decoder-flac", "encoder-flac", "decoder-libopus", "encoder-libopus",
    "decoder-libvorbis", "encoder-libvorbis", "decoder-mp1", "decoder-mp2",
    "decoder-pcm_f16le", "decoder-pcm_f24le", "decoder-pcm_f32be", "decoder-pcm_f32le",
    "decoder-pcm_f64be", "decoder-pcm_f64le", "decoder-pcm_s16be", "decoder-pcm_s16le",
    "decoder-pcm_s24be", "decoder-pcm_s24le", "decoder-pcm_s32be", "decoder-pcm_s32le",
    "decoder-pcm_s64be", "decoder-pcm_s64le", "decoder-pcm_s8", "decoder-pcm_u16be",
    "decoder-pcm_u16le", "decoder-pcm_u24be", "decoder-pcm_u24le", "decoder-pcm_u32be",
    "decoder-pcm_u32le", "decoder-pcm_u8", "encoder-pcm_f32le", "decoder-pcm_alaw", "decoder-pcm_mulaw",
    "decoder-adpcm_ima_qt", "decoder-adpcm_ima_wav", "decoder-gsm", "decoder-gsm_ms",
    "decoder-qoa",
    "decoder-ra_144", "decoder-ra_288", "decoder-ralf", "decoder-sipr",
    "decoder-wavpack", "decoder-wmalossless", "decoder-wmapro", "decoder-wmav1",
    "decoder-wmav2", "decoder-wmavoice", "decoder-cook", "decoder-dvaudio",

    // --- All Audio Formats (Muxers & Demuxers) ---
    "format-aac", "demuxer-aac", "muxer-aac",
    "format-flac", "demuxer-flac", "muxer-flac",
    "format-mp3", "demuxer-mp3", "muxer-mp3",
    "format-ogg", "demuxer-ogg", "muxer-ogg",
    "format-wav", "demuxer-wav", "muxer-wav",
    "format-aiff", "demuxer-aiff", "muxer-aiff",
    "format-qoa", "demuxer-qoa", "muxer-qoa",
    "demuxer-au", "demuxer-caf", "demuxer-wv", "demuxer-pcm_f32le", "muxer-pcm_f32le",

    // --- All Video / Container Demuxers (to extract audio) ---
    "demuxer-asf", "demuxer-avi", "demuxer-dv", "demuxer-flv", "demuxer-hls",
    "demuxer-matroska", "demuxer-mp4", "demuxer-mpeg", "demuxer-mpegts",
    "demuxer-rm", "demuxer-webm", "format-mp4", "format-webm", "format-hls",
    "muxer-mp4", "muxer-webm", "muxer-hls",

    // --- All Audio/Video Parsers (needed for seeking & extract) ---
    "parser-aac", "parser-ac3", "parser-av1", "parser-cook", "parser-dvaudio",
    "parser-flac", "parser-h261", "parser-h263", "parser-h264", "parser-hevc",
    "parser-mpeg4video", "parser-mpegaudio", "parser-mpegvideo", "parser-opus",
    "parser-rv34", "parser-sipr", "parser-vorbis", "parser-vp8", "parser-vp9",
    
    // --- All Bitstream Filters (often needed to extract audio correctly) ---
    "bsf-av1_metadata", "bsf-extract_extradata", "bsf-h264_metadata",
    "bsf-h264_mp4toannexb", "bsf-hevc_metadata", "bsf-hevc_mp4toannexb",
    "bsf-null", "bsf-vp9_metadata"
];

// Ensure no duplicates
const uniqueFragments = [...new Set(fragments)];

console.log(JSON.stringify(uniqueFragments));
