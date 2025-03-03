import { Button, Stack } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";

const ShareButtons = () => {
  const pageUrl = encodeURIComponent("https://myllos.netlify.app/");
  const text = encodeURIComponent("¡Mira esta página! 🚀");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${text}`,
    email: `mailto:?subject=Te recomiendo esta página&body=${text}%20${pageUrl}`,
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FacebookIcon />}
        onClick={() => window.open(shareLinks.facebook, "_blank")}
      >
        Facebook
      </Button>
      <Button
        variant="contained"
        color="info"
        startIcon={<TwitterIcon />}
        onClick={() => window.open(shareLinks.twitter, "_blank")}
      >
        Twitter
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<LinkedInIcon />}
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
      >
        LinkedIn
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<WhatsAppIcon />}
        onClick={() => window.open(shareLinks.whatsapp, "_blank")}
      >
        WhatsApp
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<TelegramIcon />}
        onClick={() => window.open(shareLinks.telegram, "_blank")}
      >
        Telegram
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<EmailIcon />}
        onClick={() => window.open(shareLinks.email, "_blank")}
      >
        Email
      </Button>
    </Stack>
  );
};

export default ShareButtons;
