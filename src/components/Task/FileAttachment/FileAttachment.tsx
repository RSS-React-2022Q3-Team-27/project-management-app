import Link from '@mui/joy/Link';

type FileAttachmentProps = {
  name: string;
  path: string;
};

export const FileAttachment = ({ name, path }: FileAttachmentProps) => {
  return (
    <Link href={`${URL}/${path}`} target="_blank" rel="noreferrer noopener">
      {name}
    </Link>
  );
};
