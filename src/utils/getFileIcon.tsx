import {
  DocumentText,
  Image as ImageIcon,
  Document,
  Danger,
  Music,
  Video,
  PresentionChart,
  Folder
} from "iconsax-reactjs";

import { JSX } from "react";

// Define the accepted file types as a TypeScript type
type FileExtension =
  | "jpg" | "jpeg" | "png" | "gif" | "bmp" | "tiff" | "ico"
  | "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx"
  | "txt" | "csv" | "mp3" | "wav" | "mp4" | "avi" | "mov";

// Function to extract the file extension safely
function getExtension(url: string): string | null {
  const parts = url.split(".");
  if (parts.length > 1) {
    return parts.pop()?.toLowerCase() || null;
  }
  return null;
}

// Main function to return the appropriate icon
function getFileIcon(url: string): JSX.Element {
  if (!url) return <Danger variant="Outline" />;

  const ext = getExtension(url);

  const icons: Record<FileExtension, JSX.Element> = {
    jpg: <ImageIcon variant="Outline" />,
    jpeg: <ImageIcon variant="Outline" />,
    png: <ImageIcon variant="Outline" />,
    gif: <ImageIcon variant="Outline" />,
    bmp: <ImageIcon variant="Outline" />,
    tiff: <ImageIcon variant="Outline" />,
    ico: <ImageIcon variant="Outline" />,
    pdf: <DocumentText variant="Outline" />,
    doc: <Document variant="Outline" />,
    docx: <Document variant="Outline" />,
    xls: <Document variant="Outline" />,
    xlsx: <Document variant="Outline" />,
    ppt: <PresentionChart variant="Outline" />,
    pptx: <PresentionChart variant="Outline" />,
    txt: <DocumentText variant="Outline" />,
    csv: <Document variant="Outline" />,
    mp3: <Music variant="Outline" />,
    wav: <Music variant="Outline" />,
    mp4: <Video variant="Outline" />,
    avi: <Video variant="Outline" />,
    mov: <Video variant="Outline" />,
  };

  if (ext && ext in icons) {
    return icons[ext as FileExtension];
  }

  return <Folder variant="Outline" />;
}

export default getFileIcon;