import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { AiOutlineCloudUpload, AiOutlineWarning } from "react-icons/ai";

interface Props {
  error?: string;
}

export default function UploadArea(props: Partial<DropzoneProps> & Props) {
  const { onDrop, onReject } = props;
  return (
    <Dropzone
      onDrop={onDrop ?? ((files) => console.log("dropped files", files))}
      onReject={onReject ?? ((files) => console.log("rejected files", files))}
      maxSize={props.maxSize ?? 3 * 1024 ** 2}
      accept={props.accept}
      {...props}
    >
      <Dropzone.Idle>
        <div className="flex items-center justify-center gap-x-2 p-2 bg-white">
          <AiOutlineCloudUpload size={25} />
          Upload Image
        </div>
      </Dropzone.Idle>
      <Dropzone.Reject>
        <div className="flex items-center gap-x-2 p-2 bg-white">
          <AiOutlineWarning size={25} />
          {props.error ?? "Unsupported file type or size"}
        </div>
      </Dropzone.Reject>
      {props.children}
    </Dropzone>
  );
}
