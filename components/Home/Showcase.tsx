import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
   root: {
      maxWidth: 345,
   },
   media: {
      height: 160,
   },
});

const Showcase = () => {
   const classes = useStyles();

   return (
      <Card className={classes.root}>
         <CardActionArea>
            <CardMedia className={classes.media} image="/showcase/dark_mode.png" title="Dark mode" />
            <CardContent>
               <Typography variant="h6" component="h2">
                  Dark mode
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  Did you know that dark mode saves your charge and relieve your eyes? Give it a try! 🌙
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
};

export default Showcase;
